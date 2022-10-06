export default function errorNotification(
  error,
  alertUser = false,
  userErrorMessage,
  appendReason = false
) {
  if (alertUser) {
    const finalMessage =
      userErrorMessage + (appendReason ? " Reason: " + error.message : "");
    window.alert(finalMessage);
  }
  console.error(error);
}
