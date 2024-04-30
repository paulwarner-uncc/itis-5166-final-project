// Via https://stackoverflow.com/a/34988045
class AppSettings {
  public static API_ENDPOINT = "http://localhost:3000/api";
}

type ApiResponse = {
  success: boolean,
  error?: string,
  data: object|null
};

const errorMap = new Map<string, string>();
errorMap.set("NO_CREDS", "Please provide a valid username and password.");
errorMap.set("INV_CREDS", "Please provide a valid username and password.");
errorMap.set("INV_USERNAME", "Usernames must be shorter than 25 characters.");
errorMap.set("EXP_SESS", "Your session has expired. Please sign in again.");
errorMap.set("ER_NO_USER", "Your username or password is incorrect.");
errorMap.set("ER_DUP_ENTRY", "That username is already in use.");

function convertErrorCodes(errCode: string): string {
  if (errorMap.has(errCode)) {
    return errorMap.get(errCode) as string;
  }

  // TODO: replace this with "an unknown error has occurred" in production
  return errCode;
}

export { AppSettings, ApiResponse, convertErrorCodes };
