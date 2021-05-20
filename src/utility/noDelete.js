const cantDelete = [
    "material-ui-colors",
    "flat-ui-colors-v1",
    "bold-ui-colors",
    "pastels",
    "flat-ui-colors-v2",
    "bold-ui-colors-v2",
    "spanish-countryside",
    "sorbet",
    "game-colors",
];

export const noDelete = (id) => {
    if (cantDelete.includes(id)) return false;
    return true;
};
