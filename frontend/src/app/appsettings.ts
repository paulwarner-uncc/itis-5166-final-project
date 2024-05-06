// Via https://stackoverflow.com/a/34988045
// TODO: change this to not include host once using nginx
class AppSettings {
  public static API_ENDPOINT = "http://192.168.1.254:3000/api";
  //public static API_ENDPOINT = "/api";
}

type ApiResponse = {
  success: boolean,
  error?: string,
  data: object|null
};

type Category = {
  id: number,
  name: string,
  owner: number,
  value: number
};

type Expense = {
  id: number,
  category: number,
  owner: number,
  year: number,
  month: number,
  value: number
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
errorMap.set("INV_DATE", "The specified date is invalid.");
errorMap.set("INV_VALUE", "The expense amount is invalid.");
errorMap.set("INV_EXP", "The specified expense is invalid.");
errorMap.set("NO_CAT_VALUE", "Please specify a category value.");

function convertErrorCodes(errCode: string): string {
  if (errorMap.has(errCode)) {
    return errorMap.get(errCode) as string;
  }

  // TODO: replace this with "an unknown error has occurred" in production
  return errCode;
}

const monthLookup = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

const shortMonthLookup = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct",
  "Nov", "Dec"]

export { AppSettings, ApiResponse, convertErrorCodes, Category, Expense, monthLookup, shortMonthLookup };
