export function renderErrorPage() {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Server Error</title>
      </head>
      <body>
        <main style="font-family: sans-serif; padding: 2rem;">
          <h1>Something went wrong</h1>
          <p>Please try again later.</p>
        </main>
      </body>
    </html>
  `;
}