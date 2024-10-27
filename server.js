const express = require('express');
const { Web3 } = require('web3');
require('dotenv').config();

const app = express();
const alchemyURL = process.env.ALCHEMY_URL;

const web3 = new Web3(alchemyURL);

const erc20ABI = [
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
];

function isValidAddress(address) {
    // Check basic format with regex (0x + 40 hex chars)
    const isCorrectFormat = /^0x[a-fA-F0-9]{40}$/.test(address);
    // Checksum validation: compare toChecksumAddress with original address
    const isChecksumValid = web3.utils.toChecksumAddress(address) === address;
    return isCorrectFormat && isChecksumValid;
}

app.get("/balance", async (req, res) => {
    const { tokenAddress, walletAddress } = req.query;

    if (!isValidAddress(tokenAddress) || !isValidAddress(walletAddress)) {
        return res.status(400).json({ error: "Invalid token or wallet address" });
    }

    const tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress);

    try {
        const balance = await tokenContract.methods.balanceOf(walletAddress).call();
        res.status(200).send({ balance: web3.utils.fromWei(balance, "ether") });
    } catch (error) {
        console.error("Error retrieving balance:", error);
        res.status(500).send({ error: "Failed to retrieve balance" });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});