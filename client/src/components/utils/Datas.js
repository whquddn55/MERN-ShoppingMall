const continents = [
    {id: 0, value: "Africa"},
    {id: 1, value: "Europe"},
    {id: 2, value: "Asia"},
    {id: 3, value: "North America"},
    {id: 4, value: "South America"},
    {id: 5, value: "Austrailia"},
    {id: 6, value: "Antarctica"},
]

const prices = [
    {id: 0, value: "Any", array: {}},
    {id: 1, value: "$0 to $199", array: {$gte: 0, $lte: 199}},
    {id: 2, value: "$200 to $249", array: {$gte: 200, $lte: 249}},
    {id: 3, value: "$250 to $279", array: {$gte: 250, $lte: 279}},
    {id: 4, value: "$280 to $299", array: {$gte: 280, $lte: 299}},
    {id: 5, value: "More than $300", array: {$gte: 300}},
]

module.exports = {
    continents,
    prices
}