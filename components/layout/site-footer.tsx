"use client"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="space-y-4">
            <div className="text-lg font-semibold">Product</div>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="text-lg font-semibold">Company</div>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="text-lg font-semibold">Legal</div>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/security" className="text-muted-foreground hover:text-foreground">
                  Security
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="text-lg font-semibold">Contact</div>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@mycompany.ai" className="text-muted-foreground hover:text-foreground">
                  support@mycompany.ai
                </a>
              </li>
              <li className="text-muted-foreground">
                123 AI Street<br />
                Tech City, TC 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} mycompAIny. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}