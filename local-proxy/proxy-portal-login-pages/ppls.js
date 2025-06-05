
class ProxyPortalLoginSubmit {
    constructor(e) {
        this.$redirectionUrl = e.redirectionUrl || null,
        this.$notificationID = "ppls-proxy-notification"; 
        this.$redirectBasedOnInput = document.getElementById(e.redirectBasedOnInputValue) || null, this.$inputIDs = e.inputIDs || [], this.$apiLoaderContainerID = e.apiLoaderContainerID || null, this.$apiLoaderContainer = null, this.$loaderID = e.loaderID || "api-loader-inner", this.$camelCaseSessionInputs = [], this.$sessionInputPopulateIDs = e.sessionInputPopulateIDs || null, this.$init(), this.$loginDTO = null
    }
    $fetchData(e, t, n, o = {}) {
        return fetch(e, {
            method: t,
            headers: {
                "Content-Type": "application/json",
                ...o
            },
            ...n ? {
                body: JSON.stringify(n)
            } : {}
        }).then(e => {
            if (e.ok) return e.json();
            throw new Error("HTTP error! status: " + e.status)
        });
    }
    $convertToCamelCase(e) {
        return e.split("-").map((e, t) => 0 === t ? e : e.charAt(0).toUpperCase() + e.slice(1)).join("")
    }
    $postLoginDataToProxy(t) {
        this.$fetchData("/data", "POST", this.$loginDTO).then(e => {
            t(e)
        }).catch(e => {
            console.error("Error posting login data to proxy:", e);
            this.$hideLoader();
            this.$showNotification("Login data submission in Proxy is failed. Please try again.", "danger");
        });
    }
    $callConfigDataAPI(e, t) {
        return this.$fetchData(e, "GET").then(e => {
            e ? t(e) : alert("Configuration API is working. Check the network tab for more details.")
        }).catch(e => {
            console.error("Error calling configuration API:", e);
            this.$hideLoader();
            this.$showNotification("Configuration API fetch failed. Please try again.", "danger");
        });
    }
    $callLoginDataAPI(e, t) {
        return this.$fetchData(e, "POST", this.$loginDTO.loginCredential, {
            "X-API-KEY": "AcessToken",
            Authorization: "Bearer loginToken"
        }).then(e => {
            e ? t(e) : alert("Login API is working. Check the network tab for more details.")
        }).catch(e => {
            console.error("Error calling login API:", e);
            this.$hideLoader();
            this.$showNotification("Login API failed. Please try again.", "danger");
        });
    }
    $populateSessionInputs() {
        this.$sessionInputPopulateIDs && Array.isArray(this.$sessionInputPopulateIDs) ? this.$sessionInputPopulateIDs.forEach(e => {
            var e = this.$convertToCamelCase(e),
                t = this[e],
                n = localStorage.getItem("apm:proxy:" + e);
            n ? t.value = n : console.warn(`No session value found for ${e} while trying to populate.`)
        }) : console.warn("No session input IDs provided or not an array while trying to populate.")
    }
    $saveToSession() {
        this.$sessionInputPopulateIDs && Array.isArray(this.$sessionInputPopulateIDs) ? this.$camelCaseSessionInputs.forEach(e => {
            var {
                id: e,
                camelCase: t,
                ref: n
            } = e;
            n && n.value ? localStorage.setItem("apm:proxy:" + t, n.value) : console.warn(`Input with ID ${e} not found or has no value while trying to save.`)
        }) : console.warn("No session input IDs provided or not an array while trying to save.")
    }
    $getYparamFromLinks(e, t) {
        e = e.find(e => e.rel === t);
        return new URL(e.href).searchParams.get("_y_")
    }
    $showLoader(innerEl) {
        var e, t;
        this.$apiLoaderContainer ? (
            e = document.createElement("div"), 
            t = document.createElement("div"),
            t.className = "loader-image", 
            e.appendChild(innerEl ? innerEl : t), 
            e.id = this.$loaderID, 
            this.$apiLoaderContainer.prepend(e)
        ) : console.warn("API loader container not found.")
    }
    $hideLoader() {
        var e;
        this.$apiLoaderContainer ? (e = document.getElementById(this.$loaderID)) && e.remove() : console.warn("API loader container not found.")
    }
    $init() {
        this.$apiLoaderContainerID && (this.$apiLoaderContainer = document.getElementById(this.$apiLoaderContainerID)), this.$inputIDs.forEach(e => {
            var t;
            e && "string" == typeof e || alert("Invalid input ID: " + e), e.startsWith("$") ? alert(`Input ID named "${e}" cannot start with "$".`) : (t = this.$convertToCamelCase(e), this[t] = document.getElementById(e), this.$sessionInputPopulateIDs && this.$sessionInputPopulateIDs.includes(e) && this.$camelCaseSessionInputs.push({
                id: e,
                camelCase: t,
                ref: this[t]
            }), this[t] || console.error(`Input element with ID ${e} not found.`))
        }), this.$populateSessionInputs()
    }
    $redirect(t, e = !1) {
        if (e) window.location.href = t;
        else {
            let e = t;
            this.$redirectionUrl && ("string" == typeof this.$redirectionUrl ? e = this.$redirectionUrl + "" + (t || "") : "object" == typeof this.$redirectionUrl && this.$redirectBasedOnInput && this.$redirectionUrl.hasOwnProperty(this.$redirectBasedOnInput.value) && (e = this.$redirectionUrl[this.$redirectBasedOnInput.value] + "" + (t || ""))), window.location.href = e
        }
    }
    $redirectAsync(t, e = !1) {
        const red = document.createElement("div");
        red.textContent = "Redirecting...";
        this.$showLoader(red);
        setTimeout(() => {
            this.$hideLoader();
            this.$redirect(t, e);
        }, 1000);
    }
    $showNotification(e, t = "primary") {
        var n = document.createElement("div");
        n.id = this.$notificationID;
        n.className = `alert alert-${t}`;
        n.textContent = e;
        if (this.$apiLoaderContainerID) {
          this.$apiLoaderContainer.prepend(n) 
        } else {
            document.body.prepend(n);
        }
        setTimeout(() => {
            n.remove()
        }, 3000)
    }
}