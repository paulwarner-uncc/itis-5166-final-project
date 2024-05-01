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
errorMap.set("INV_USERNAME", "Usernames must be shorter than 25 characters.");
errorMap.set("EXP_SESS", "Your session has expired. Please sign in again.");
errorMap.set("ER_NO_USER", "Your username or password is incorrect.");
errorMap.set("ER_DUP_USER", "That username is already in use.");
errorMap.set("NOT_IMPL", "This part of the application has not been implemented.");
errorMap.set("BAD_PAGE", "404 Error. Are you lost?");
errorMap.set("NO_CAT_NAME", "Please provide a valid category name.");
errorMap.set("INV_CAT_NAME", "Category names must be shorter than 25 categories.");
errorMap.set("ER_DUP_CAT", "Category names must be unique.");
errorMap.set("INV_CAT", "The specified category is invalid.");

function convertErrorCodes(errCode: string): string {
  if (errorMap.has(errCode)) {
    return errorMap.get(errCode) as string;
  }

  // TODO: replace this with "an unknown error has occurred" in production
  return errCode;
}

export { AppSettings, ApiResponse, convertErrorCodes };
