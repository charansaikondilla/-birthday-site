# Google Sign-In Setup

This guide sets up "Sign in with Google" for `birthday.airakhi.online`.

You need:
- A Google account
- Access to the project files in `D:\my side projects\ai websites`
- Node.js installed (for `npx wrangler`)

---

## Step 1: Create a Google Cloud project

1. Go to https://console.cloud.google.com
2. Sign in with your Google account.
3. Click the project dropdown at the top, then **New Project**.
4. Name it `birthday-gifts` and click **Create**.
5. Make sure the new project is selected in the dropdown.

## Step 2: Set up the OAuth consent screen

1. In the left menu, go to **APIs & Services → OAuth consent screen**.
2. Choose **External**, then click **Create**.
3. Fill in:
   - **App name:** `Birthday Gifts`
   - **User support email:** your email
   - **Developer contact email:** your email
4. Click **Save and Continue** through the Scopes and Test users pages. You don't need to add anything yet.
5. On the Test users page, click **Add Users** and add the Google accounts you'll test with. While the app is in "Testing" mode, only these accounts can sign in.
6. Click **Back to Dashboard**.

## Step 3: Create the OAuth Client ID

1. Go to **APIs & Services → Credentials**.
2. Click **+ Create Credentials → OAuth client ID**.
3. For **Application type**, choose **Web application**.
4. Name it `Birthday Gifts Web`.
5. Under **Authorized JavaScript origins**, click **+ Add URI** and add both:
   - `https://birthday.airakhi.online`
   - `http://localhost:8080` (for testing on your computer; change the port if you use another one)

   Enter origins only. Do not include a path or a trailing slash.
6. Leave **Authorized redirect URIs** empty. The Google sign-in button does not need it.
7. Click **Create**.
8. Copy the **Client ID**. It looks like:
   `123456789-abcdefg.apps.googleusercontent.com`

The Client ID is public. It is safe to put in the code. Do not copy the **Client secret**, because this setup doesn't use it.

## Step 4: Put the Client ID in the project

Open `cloud-config.js` and find this line:

```js
GOOGLE_CLIENT_ID: '',
```

Paste your Client ID between the quotes:

```js
GOOGLE_CLIENT_ID: '123456789-abcdefg.apps.googleusercontent.com',
```

Next, open `worker/wrangler.toml` and find this line:

```toml
GOOGLE_CLIENT_ID = "REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID"
```

Replace the placeholder with the same Client ID:

```toml
GOOGLE_CLIENT_ID = "123456789-abcdefg.apps.googleusercontent.com"
```

Both files must have the same value. The Worker uses the `wrangler.toml` value to check that each sign-in token was issued for your app.

## Step 5: Set the session secret

The Worker needs a secret to sign login sessions. Run this from the `worker` folder:

```bash
cd "D:\my side projects\ai websites\worker"
npx wrangler secret put SESSION_SECRET
```

When prompted, paste a long random string. To generate one, run this in PowerShell:

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

Keep this value private. Do not put it in any file in the project.

## Step 6: Deploy the Worker

From the `worker` folder:

```bash
npx wrangler deploy
```

Wrangler prints the Worker URL when the deploy finishes. Put that URL in `cloud-config.js` as the API base URL if it isn't set yet.

## Step 7: Test it

**On your computer:**
1. Run a local server in the project folder, for example:
   ```bash
   npx serve -l 8080
   ```
2. Open `http://localhost:8080/login.html`.
3. Click **Sign in with Google** and choose a test account from Step 2.
4. You should land back on the site, signed in.

**On the live domain** (after the frontend is deployed to `birthday.airakhi.online`):
1. Open `https://birthday.airakhi.online/login.html`.
2. Sign in with a test account.

## Troubleshooting

| Problem | Fix |
|---|---|
| `Error 400: origin_mismatch` | The site's exact URL is missing from **Authorized JavaScript origins**. Check for typos, `http` vs `https`, and any trailing slash. |
| `Access blocked: app has not completed verification` | Add your account under **OAuth consent screen → Test users**. |
| `could not verify Google sign-in (wrong audience)` | The Client ID in `wrangler.toml` doesn't match `cloud-config.js`. Make them identical and run `npx wrangler deploy` again. |
| `Google sign-in is not configured on this server yet` | `GOOGLE_CLIENT_ID` in `wrangler.toml` is still the placeholder, or the Worker wasn't redeployed. |
| Sign-in works locally but not on the domain | Add `https://birthday.airakhi.online` to the authorized origins and wait a few minutes for Google to update. |

## Before public launch

While the consent screen is in "Testing" mode, only the test users you added can sign in. To open it to everyone, go to **OAuth consent screen → Publish App**. Google may ask you to verify the app if it requests sensitive scopes. Basic sign-in (email, profile) normally doesn't need verification.
