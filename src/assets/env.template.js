(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["UserPoolId"] = "";
    window["env"]["ClientId"] = '';
    window["env"]["tenantId"] = "${ll_tenant_id}";
    window["env"]["stripeKey"] = '${ll_stripe_key}';
    window["env"]["pKey"] = '${webui_public_key}';
    window["env"]["answers"] = "/answers";
    window["env"]["riskApi"] = "";
    window["env"]["subscription"] = '';
    window["env"]["userProfileApi"] = "";
    window["env"]["yodlee"] = '';
    window["env"]["eventConfig"] = "assets/data/events.json";
    window["env"]["debug"] = '/questions';
  })(this);