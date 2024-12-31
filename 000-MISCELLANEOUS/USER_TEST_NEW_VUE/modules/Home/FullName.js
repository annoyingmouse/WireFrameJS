export const FullName = {
  name: "full-name",
  functional: true,
  render: function (createElement, context) {
    const item = context.props.item;
    return createElement(
      "span",
      `${item.title} ${item.forename} ${item.surname}`,
    );
  },
};
