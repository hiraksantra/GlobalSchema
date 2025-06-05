//https://ent-dev.participantportal.com/benefits/servlets/PreLoginEnrollmentTokenServlet
//https://oci-sajnopmploigext.participantportal.com/dev/api/hsaaccounts/calculator/getHsaSavingsCalculatorDetails
//https://oci-sajnopmploigext.participantportal.com/dev/api/hsaaccounts/calculator/submitHsaSavingsCalculatorDetails

const ppls = new ProxyPortalLoginSubmit({
    apiLoaderContainerID: "login-form-section",
    loaderID: "api-loader",
    redirectionUrl: {
        MS: 'https://localhost:3001',
        REST: 'https://localhost:3001'
    },
    redirectBasedOnInputValue: "api",
    inputIDs: ['username', 'password', 'api', 'page-redirection'],
    sessionInputPopulateIDs: ['username', 'password', 'api', 'page-redirection']
});

function redirectWithToken(event) {
    event.preventDefault();
    ppls.$saveToSession();
    ppls.$showLoader();
    ppls.$loginDTO = {
        loginCredential: {
            switchAccount: false,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            isLoginFromPortal3: "Yes"
        }
    };
    ppls.$postLoginDataToProxy(response => {
        ppls.$callConfigDataAPI('/web/v0/public/configuration', configResponse => {
            const url = configResponse.links.find(link => link.rel === "LOGIN.MS.URL").href;
            ppls.$callLoginDataAPI(url, response => {
                ppls.$hideLoader();
                const yParam = ppls.$getYparamFromLinks(response.links, "EEHOME3");
                ppls.$redirectAsync(`/#/${ppls.pageRedirection.value}?_y_=${yParam}`);
            });
        });
    });
    return false;
}