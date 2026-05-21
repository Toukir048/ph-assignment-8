"use client";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const googleSetupMessage =
  "Google login is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, then restart the server.";

export async function continueWithGoogle(errorCallbackURL) {
  try {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      newUserCallbackURL: "/",
      errorCallbackURL
    });

    if (error) {
      if (
        error.code === "PROVIDER_NOT_FOUND" ||
        error.message?.toLowerCase().includes("provider not found")
      ) {
        throw new Error(googleSetupMessage);
      }

      throw new Error(error.message);
    }
  } catch (error) {
    toast.error(error.message || googleSetupMessage);
  }
}
