"use client";

import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    loadPyodide?: (config: {
      indexURL: string;
      stdout?: (text: string) => void;
      stderr?: (text: string) => void;
    }) => Promise<any>;
    pyodideInstance?: any;
    prompt: (message?: string, _default?: string) => string | null;
  }
}

export interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime: number; // in milliseconds
}

export type PyodideStatus = "idle" | "loading_script" | "initializing" | "ready" | "error";

export function usePyodide() {
  const [status, setStatus] = useState<PyodideStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("Initializing...");
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [installedPackages, setInstalledPackages] = useState<string[]>([]);
  const [isInstallingPackage, setIsInstallingPackage] = useState(false);
  const [packageInstallMessage, setPackageInstallMessage] = useState<string | null>(null);

  const pyodideRef = useRef<any>(null);
  const userGlobalsRef = useRef<any>(null);

  // Initialize Pyodide
  useEffect(() => {
    let isMounted = true;

    async function initPyodide() {
      // If already initialized globally on window
      if (window.pyodideInstance) {
        pyodideRef.current = window.pyodideInstance;
        setStatus("ready");
        setStatusMessage("Python 3.12 Engine Ready");
        return;
      }

      try {
        setStatus("loading_script");
        setStatusMessage("Loading Pyodide runtime from CDN...");

        // Check if script is already in document
        const SCRIPT_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        const INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

        if (!document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = SCRIPT_URL;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () =>
              reject(new Error("Failed to load Pyodide CDN script. Check your internet connection."));
            document.head.appendChild(script);
          });
        }

        if (!isMounted) return;

        setStatus("initializing");
        setStatusMessage("Initializing WebAssembly Python environment...");

        if (typeof window.loadPyodide !== "function") {
          throw new Error("window.loadPyodide is not defined after script load.");
        }

        const pyodide = await window.loadPyodide({
          indexURL: INDEX_URL,
        });

        if (!isMounted) return;

        setStatusMessage("Configuring standard I/O and browser prompt...");

        // Initialize standard input/output redirection and browser prompt fallback for input()
        await pyodide.runPythonAsync(`
import sys
import io
import js
import builtins

# Clean input() prompt handler via browser dialog
def _pyquest_input(prompt_msg=""):
    msg = str(prompt_msg) if prompt_msg else "Python input():"
    res = js.prompt(msg)
    if res is None:
        return ""
    return str(res)

builtins.input = _pyquest_input
`);

        pyodideRef.current = pyodide;
        window.pyodideInstance = pyodide;

        // Create persistent user namespace dict
        userGlobalsRef.current = pyodide.toPy({});

        if (isMounted) {
          setStatus("ready");
          setStatusMessage("Python 3.12 Engine Ready");
        }
      } catch (err: any) {
        console.error("Pyodide initialization error:", err);
        if (isMounted) {
          setStatus("error");
          setStatusMessage("Failed to load Python Engine");
          setErrorDetails(err.message || String(err));
        }
      }
    }

    initPyodide();

    return () => {
      isMounted = false;
    };
  }, []);

  // Execute Python Code
  const runCode = useCallback(async (code: string): Promise<ExecutionResult> => {
    if (!pyodideRef.current) {
      return {
        output: "",
        error: "Python engine is not ready yet. Please wait a moment.",
        executionTime: 0,
      };
    }

    const pyodide = pyodideRef.current;
    const startTime = performance.now();

    try {
      // Set the code in Python namespace
      pyodide.globals.set("__user_code_raw__", code);

      const runnerCode = `
import sys
import io
import traceback

_stdout_buf = io.StringIO()
_stderr_buf = io.StringIO()
_orig_stdout = sys.stdout
_orig_stderr = sys.stderr

sys.stdout = _stdout_buf
sys.stderr = _stderr_buf

_error_text = None

try:
    # Execute user code in global dict
    exec(compile(__user_code_raw__, "<studio>", "exec"), globals())
except Exception as e:
    _error_text = traceback.format_exc()
finally:
    sys.stdout = _orig_stdout
    sys.stderr = _orig_stderr

_final_output = _stdout_buf.getvalue()
_final_stderr = _stderr_buf.getvalue()
`;

      await pyodide.runPythonAsync(runnerCode);

      const endTime = performance.now();
      const executionTime = Math.round((endTime - startTime) * 10) / 10;

      const output = (pyodide.globals.get("_final_output") as string) || "";
      const stderr = (pyodide.globals.get("_final_stderr") as string) || "";
      const errorText = (pyodide.globals.get("_error_text") as string) || null;

      const combinedOutput = output + (stderr ? (output ? "\n" : "") + stderr : "");

      return {
        output: combinedOutput,
        error: errorText,
        executionTime,
      };
    } catch (err: any) {
      const endTime = performance.now();
      return {
        output: "",
        error: err.message || String(err),
        executionTime: Math.round((endTime - startTime) * 10) / 10,
      };
    }
  }, []);

  // Install a package using micropip or built-in loadPackage
  const installPackage = useCallback(async (pkgName: string): Promise<boolean> => {
    if (!pyodideRef.current) return false;
    const pyodide = pyodideRef.current;
    const cleanName = pkgName.trim().toLowerCase();
    if (!cleanName) return false;

    setIsInstallingPackage(true);
    setPackageInstallMessage(`Installing ${cleanName}...`);

    try {
      // Try built-in loadPackage first (fastest for numpy, pandas, matplotlib)
      try {
        await pyodide.loadPackage(cleanName);
      } catch {
        // Fallback to micropip
        await pyodide.loadPackage("micropip");
        const micropip = pyodide.pyimport("micropip");
        await micropip.install(cleanName);
      }

      setInstalledPackages((prev) => (prev.includes(cleanName) ? prev : [...prev, cleanName]));
      setPackageInstallMessage(`Successfully installed ${cleanName}!`);
      setTimeout(() => setPackageInstallMessage(null), 3500);
      return true;
    } catch (err: any) {
      console.error(`Failed to install package ${cleanName}:`, err);
      setPackageInstallMessage(`Failed to install ${cleanName}: ${err.message || String(err)}`);
      setTimeout(() => setPackageInstallMessage(null), 5000);
      return false;
    } finally {
      setIsInstallingPackage(false);
    }
  }, []);

  return {
    status,
    statusMessage,
    errorDetails,
    runCode,
    installPackage,
    installedPackages,
    isInstallingPackage,
    packageInstallMessage,
  };
}
