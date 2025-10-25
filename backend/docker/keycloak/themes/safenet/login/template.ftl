<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
<#-- Use Keycloak's built-in locale handling -->
<#assign currentLocale = locale.currentLanguageTag!"en">

<!DOCTYPE html>
<html lang="${(locale.currentLanguageTag)!'en'}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('=')[0]}" content="${meta?split('=')[1]}"/>
        </#list>
    </#if>
    
    <title>
        <#if pageTitle?has_content>
            ${pageTitle} - ${realm.displayName!'SafeNet'}
        <#else>
            ${msg("loginTitle",(realm.displayName!'SafeNet'))}
        </#if>
    </title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    
    <#if properties.stylesCommon?has_content>
        <#list properties.stylesCommon?split(' ') as style>
            <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
</head>

<body class="login-pf">
    <div class="login-pf">
        <div class="login-pf-page">
            <div class="card-pf">
                <!-- Logo -->
                <div class="kc-logo">
                    <img src="${url.resourcesPath}/img/logo.png" 
                         alt="${realm.displayName!'SafeNet'}" 
                         class="kc-logo-light" />
                    <img src="${url.resourcesPath}/img/logo_dark.png" 
                         alt="${realm.displayName!'SafeNet'}" 
                         class="kc-logo-dark" />
                </div>
                
                <!-- Header -->
                <header class="kc-header">
                    <h1>
                        <#nested "header">
                    </h1>
                </header>
                
                <!-- Messages -->
                <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                    <div class="kc-${message.type}">
                        ${kcSanitize(message.summary)?no_esc}
                    </div>
                </#if>

                <!-- Main Form -->
                <div class="kc-form">
                    <#nested "form">
                </div>

                <!-- Social Providers -->
                <#if social?? && social.providers??>
                    <div class="kc-social-providers">
                        <div class="kc-social-divider">
                            <span>${msg("template.socialDivider")}</span>
                        </div>
                        <div class="kc-social-buttons">
                            <#list social.providers as p>
                                <a href="${p.loginUrl}" class="kc-social-button" data-provider="${p.providerId}">
                                    <#if p.providerId == 'google'>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                                            <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.909-2.258c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                                            <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                                            <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                                        </svg>
                                    </#if>
                                    <span>${p.displayName}</span>
                                </a>
                            </#list>
                        </div>
                    </div>
                </#if>
                
                <!-- Footer -->
                <footer class="kc-footer">
                    <p>${msg("template.footer")}</p>
                </footer>
            </div>
        </div>
    </div>
</body>
</html>
</#macro>