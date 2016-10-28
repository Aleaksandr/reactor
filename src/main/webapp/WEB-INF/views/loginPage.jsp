<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@page session="true" %>
<html>
<body onload='document.loginForm.username.focus();'>
<h3>Reactor</h3>

<c:if test="${not empty error}">
    <div>${error}</div>
</c:if>
<c:if test="${not empty message}">
    <div>${message}</div>
</c:if>

<form name='loginForm' action="<c:url value='/loginPage' />" method='POST'>"

    <table>
        <tr>
            <td>User:</td>
            <td><input type='text' name='username'></td>
        </tr>
        <tr>
            <td>Password:</td>
            <td><input type='password' name='password'/></td>
        </tr>

        <tr>
            <td></td>
            <td>Remember Me: <input type="checkbox" name="remember-me"/></td>
        </tr>

        <tr>
            <td colspan='2'><input name="submit" type="submit" value="submit"/></td>
        </tr>

    </table>

    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>

</form>
</body>
</html>