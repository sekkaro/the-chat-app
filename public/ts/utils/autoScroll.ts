export const autoScroll = ($messages: Element | null) => {
  const $newMessage = $messages!.lastElementChild;

  const newMessageStyles = getComputedStyle($newMessage!);

  const newMessageHeight =
    ($newMessage as HTMLElement).clientHeight +
    parseInt(newMessageStyles.marginBottom);

  const visibleHeight = ($messages as HTMLElement).clientHeight;

  const containerHeight = $messages!.scrollHeight;

  const scrollOffset = $messages!.scrollTop + visibleHeight;

  if (
    Math.round(containerHeight - newMessageHeight - 1) <=
    Math.round(scrollOffset)
  ) {
    $messages!.scrollTop = $messages!.scrollHeight;
  }
};
