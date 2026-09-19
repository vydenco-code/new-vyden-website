import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <p className="font-serif text-3xl text-white mb-3">Something went wrong.</p>
            <p className="text-sm text-white/60 mb-6 max-w-md">
              An unexpected error stopped this page from loading. Please try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gold text-navy-deep px-6 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-gold-light transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
