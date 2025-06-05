(function(response, options) {
   // console.log("=======login response filter====")
   response.body.roleBasedObjPrivilegeBn =  response.body.roleBasedObjPrivilegeBn.concat([
    {objName:"ACCTTAB.MENU.HSA", objPrivilege: "Disable", objType: "Portal3Obj"}, 
    {objName:"PROFILE.DROPDOWN.BENEFICIARIES", objPrivilege: "Disable", objType: "Portal3Obj"},
    {objName:"PROFILE.OVERVIEW.BENEFICIARIES.DATA", objPrivilege: "Hide", objType: "Portal3Obj"},
    {objName:"PROFILE.OVERVIEW.BENEFICIARIES.VIEWMORE", objPrivilege: "Disable", objType: "Portal3Obj"},   
    {objName:"DASHBOARD.HSA.VIEWACCOUNT", objPrivilege: "Disable", objType: "Portal3Obj"},
    {objName:"DASHBOARD.HSA.MORE", objPrivilege: "Disable", objType: "Portal3Obj"},
    {objName:"DASHBOARD.HSA.CONTRIBUTEFUNDS", objPrivilege: "Disable", objType: "Portal3Obj"},
    {objName:"DASHBOARD.HSA.WITHDRAWFUNDS", objPrivilege: "Disable", objType: "Portal3Obj"},
    {objName:"DASHBOARD.HSA.AVAILABLEBALANCE", objPrivilege: "Hide", objType: "Portal3Obj"},
    {objName:"DASHBOARD.HSA.INVESTED", objPrivilege: "Hide", objType: "Portal3Obj"},
    {objName:"DASHBOARD.HSA.TOTALACCOUNTBALANCE", objPrivilege: "Hide", objType: "Portal3Obj"},
    {objName:"DASHBOARD.HSA.CURRENTYTDCONTRIBUTIONS", objPrivilege: "Hide", objType: "Portal3Obj"},
    {objName:"DASHBOARD.HSA.CURRENTYTDWITHDRAWALS", objPrivilege: "Hide", objType: "Portal3Obj"},
    {objName:"PROFILE.MENU.HSA.BENEFICIARIESTAB", objPrivilege: "Disable", objType: "Portal3Obj"}]);
    return response;
})