# Routing Debug Guide

## Testing Routes

1. **Rebuild the app:**
   ```bash
   npm run build
   ```

2. **Restart the server:**
   ```bash
   npm run dev
   ```

3. **Test the routes:**
   - Navigate to: `http://localhost:3000/#/login`
   - Navigate to: `http://localhost:3000/#/dashboard`

## Expected Behavior

- `/login` - Should show the login page (no redirect)
- `/dashboard` - Should check auth and redirect to `/login` if not authenticated

## Troubleshooting

If routes still redirect to homepage:

1. **Clear browser cache** - Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

2. **Check browser console** for errors

3. **Verify the build** includes the pages:
   ```bash
   grep -r "Login\|Dashboard" dist/index.js
   ```

4. **Check if routes are matching** - Add console.log in App.tsx to see which route is being matched

5. **Verify HashRouter** - With HashRouter, URLs should be `/#/login` not `/login`

## Direct URL Access

When accessing directly via URL:
- Use: `http://localhost:3000/#/login`
- Not: `http://localhost:3000/login`

HashRouter automatically handles the `#` in the URL.

