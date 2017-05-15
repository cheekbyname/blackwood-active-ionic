export class Auth {
	authority: string = "https://login.windows.net/blackwoodhc.onmicrosoft.com";
    redirectUri: string = "http://blackwood-ionic-active";
    //resourceUrl: string = "https://localhost:44352";
    resourceUrl: string = "https://Blackwoodhc.onmicrosoft.com/active/api";
    clientId: string = "91645298-b5a3-4e90-bf48-0305bb8cd1f5";
}

export class Api {
    // baseUrl: string = "http://hof-iss-alexc/active/api";

    // baseUrl: string = "https://localhost:44352/active";
    // coreUrl: string = "http://localhost:58976/api";

    // For workstation remote
    // baseUrl: string = "https://mbhof754:44352/active";
    //coreUrl: string = "https://mbhof754.m-blackwood.mbha.org.uk:44357/api";

    // For HOF-ISS-ALEXC test platform
    //coreUrl: string = "https://hof-iss-alexc.m-blackwood.mbha.org.uk/api";

    // For Live
    coreUrl: string = "https://hof-iis-live-01.m-blackwood.mbha.org.uk/api";

    public apiBase(api: string): string {
        switch (api) {
            case "api" :
                return this.coreUrl;
            case "active" :
                //return this.baseUrl;
        }
    }
}