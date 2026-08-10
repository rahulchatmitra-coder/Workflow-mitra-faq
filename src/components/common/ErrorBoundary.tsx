import * as React from "react";
import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service (e.g., Sentry)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // You can send to error tracking service here
    // if (import.meta.env.VITE_SENTRY_DSN) {
    //   Sentry.captureException(error);
    // }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-white p-6 dark:bg-black">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100 text-red-600 shadow-lg dark:bg-red-950/80 dark:text-red-400">
              <AlertTriangle className="h-10 w-10" />
            </div>
            
            <h1 className="mt-6 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              Something went wrong
            </h1>
            
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              We encountered an unexpected error. Please try refreshing the page or return to the homepage.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-left text-sm dark:border-red-900 dark:bg-red-950/20">
                <summary className="cursor-pointer font-semibold text-red-700 dark:text-red-400">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 overflow-x-auto text-xs text-red-600 dark:text-red-500">
                  {this.state.error.toString()}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={this.handleReload} className="gap-2">
                <RefreshCw className="h-4 w-4" /> Reload Page
              </Button>
              <Button onClick={this.handleGoHome} variant="outline" className="gap-2">
                <Home className="h-4 w-4" /> Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
