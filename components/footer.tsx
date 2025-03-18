import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Parf Finance</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Parf Finance. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Twitter
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  )
}

