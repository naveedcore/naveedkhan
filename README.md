Open `index.html` in a browser to view the one-page interactive resume.

The original PDF resume is included as `Naveed_Khan_Resume.pdf` and is linked from the page.

Clean URLs are configured for common static hosts:

- GitHub Pages: use the repository root with `index.html`; `.nojekyll` is included, and the page removes `/index.html` from the browser address bar.
- Netlify: `_redirects`
- Vercel: `vercel.json`
- Apache/cPanel: `.htaccess`

After choosing the final live domain, update the canonical and Open Graph URL values in `index.html` from `/` to the full production URL, such as `https://username.github.io/repository-name/` or your custom domain.
