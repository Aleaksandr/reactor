<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@page session="true"%>
<head>
    <title>Reactor Welcome Page</title>
    <link rel="icon" type="image/png" href="/res/img/favicon.ico"/>
</head>
<h4>Welcome to Reactor</h4>

<c:url value="/logout" var="logoutUrl" />
<form id="logout" action="${logoutUrl}" method="post" >
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
</form>
<c:if test="${pageContext.request.userPrincipal.name != null}">
    <a href="javascript:document.getElementById('logout').submit()">Logout</a>
</c:if>

</br>
</br>

<c:if test="${pageContext.request.userPrincipal.name != null}">
    <h2>
        Welcome : ${pageContext.request.userPrincipal.name}
    </h2>
</c:if>

</br>
<sec:authorize access="isRememberMe()">
    <p style="color: #cd0a0a"># This user is login by "Remember Me Cookies".</p>
</sec:authorize>

<sec:authorize access="isFullyAuthenticated()">
    <p style="color: #00cae9"># This user is login by username / password.</p>
</sec:authorize>