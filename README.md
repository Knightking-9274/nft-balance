This is project to Understand NFT token contracts and token balance retrieval through web3.js

Below is the ERC20 NFT smart contract. I have used Openzeppelin library for writing smart contract. This makes it really easy to write ERC20 NFT Token.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



// Custom ERC-20 token with minting capability for the owner.

contract MyToken is ERC20, Ownable {

    // Initial supply of tokens (in token units, NOT wei)
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** 18); // 1,000,000 tokens with 18 decimals

   
    //Constructor that gives msg.sender all of initial supply.
   
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY); // Mint the initial supply to the deployer
    }

    
    
    // amount Amount of tokens to mint (in token units, NOT wei)
    // Only callable by the contract owner.
     
    function mint(uint256 amount) external onlyOwner {
        _mint(msg.sender, amount);
    }
}

Step 1: Write NFT Token smart contract with ERC20 standard.

Step 2: Deploy the smart contract. (I have used Sepolia for deploying)

Step 3: Write the Node.js and Express server. Install dependencies(web3, express etc.)

Step 4: Create Alchemy project and add the URL and project ID.

Step 5: Run the server and hit this URL ->http://localhost:4000/balance?tokenAddress=TOKEN_ADDRESS&walletAddress=WALLET_ADDRESS

Output:{"balance":"1000000"}
