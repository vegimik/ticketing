export default function parseJwtFromCookies(req:any) {
    let cookiesArray = [];
    let cookies: { [key: string]: string } = {};
    var cookiesData = req.headers.cookie;
    if (cookiesData) {
      cookiesArray = cookiesData.split(";");
  
      cookiesArray.forEach((cookie:any) => {
        const [key, value] = cookie.trim().split("=");
        cookies[key] = value;
      });
    }
    return cookies['jwt']
  }