const SIGNIFICANCE = 1e-2;

const roundTwoPlaces = num => {
    /**
     * https://stackoverflow.com/a/11832950
     */
    return Math.round(num * 100) / 100;
};

module.exports = {
    SIGNIFICANCE,
    roundTwoPlaces
};
