<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@page session="true"%>
<head>
    <title>Reactor Index Page</title>
    <link rel="icon" type="image/png" href="/res/img/favicon.ico"/>
</head>
<h3>Welcome to Reactor Index Page</h3>


<c:url value="/logout" var="logoutUrl" />
<form id="logout" action="${logoutUrl}" method="post" >
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
</form>
<c:if test="${pageContext.request.userPrincipal.name != null}">
    <a href="javascript:document.getElementById('logout').submit()">Logout</a>
</c:if>

<c:url value="/loginPage" var="loginUrl" />
<c:if test="${pageContext.request.userPrincipal.name == null}">
    <a href="${loginUrl}">Login</a>
</c:if>
</br>
<c:url value="/generic/main" var="main" />
<a href="${main}">Generic</a>
<c:url value="/cities" var="cities" />
<a href="${cities}">Cities</a>

</br>
</br>
<sec:authorize access="isRememberMe()">
    <p style="color: #cd0a0a"># This user is login by "Remember Me Cookies".</p>
</sec:authorize>

<sec:authorize access="isFullyAuthenticated()">
    <p style="color: #00cae9"># This user is login by username / password.</p>
</sec:authorize>