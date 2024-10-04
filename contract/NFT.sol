// // SPDX-License-Identifier: MIT
// // Compatible with OpenZeppelin Contracts ^5.0.0
// pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";

// contract APU is ERC721, Ownable {
//     uint256 private _nextTokenId = 1;
//     uint256 public constant TOTAL_SUPPLY = 7777;
//     uint256 public currentSupply = 0;
//     string private _baseURL;

//     constructor() ERC721("APU", "APU") Ownable(msg.sender) {
//         _baseURL = " ipfs://QmU4dtKcDo7tPtfxxyhyBLdge7KaoxDbHkVrMyU4DmrEAd/";
//     }

//     function _baseURI() internal view override returns (string memory) {
//         return _baseURL;
//     }

//     function setBaseURL(string memory newBaseURL) public onlyOwner {
//         _baseURL = newBaseURL;
//     }

//     function tokenURI(uint256 tokenId)
//         public
//         view
//         virtual
//         override
//         returns (string memory)
//     {
//         string memory base = _baseURI();
//         return
//             bytes(base).length > 0
//                 ? string(
//                     abi.encodePacked(base, Strings.toString(tokenId), ".json")
//                 )
//                 : "";
//     }

//     function safeMint(address to) public {
//         require(_nextTokenId <= TOTAL_SUPPLY, "Exceeds total supply");
//         uint256 tokenId = _nextTokenId++;
//         _safeMint(to, tokenId);
//         currentSupply++;
//     }

//     function batchMintNFT(address to, uint256 quantity) external {
//         require(
//             _nextTokenId + quantity <= TOTAL_SUPPLY,
//             "Exceeds total supply"
//         );
//         for (uint256 i = 0; i < quantity; i++) {
//             _safeMint(to, _nextTokenId);
//             _nextTokenId++;
//             currentSupply++;
//         }
//     }
// }

// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract APU is ERC721, ERC2981, Ownable {
    uint256 private _nextTokenId = 1;
    uint256 public constant TOTAL_SUPPLY = 7777;
    uint256 public currentSupply = 0;
    string private _baseURL;
    address public royaltiesReceiver;
    uint96 public royaltyPercentage; // Dynamic royalty percentage (in basis points)

    // Event to log base URL changes
    event BaseURLChanged(string oldBaseURL, string newBaseURL);

    constructor() ERC721("APU", "APU") Ownable(msg.sender) {
        _baseURL = "ipfs://QmQWeg6pkdgPJWHqXiPzRhVHgosK64DP5SkuuHaitdBmCP/";
        royaltiesReceiver = 0xcd970863cB05d353c68C1076A75E82C6E52C3205;
        royaltyPercentage = 777; // 7.77% in basis points
        _setDefaultRoyalty(royaltiesReceiver, royaltyPercentage);
    }

    // Base URI for token metadata
    function _baseURI() internal view override returns (string memory) {
        return _baseURL;
    }

    // Owner can set a new base URL
    function setBaseURL(string memory newBaseURL) public onlyOwner {
        emit BaseURLChanged(_baseURL, newBaseURL);
        _baseURL = newBaseURL;
    }

    // Token URI with the token ID appended to the base URL
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        string memory base = _baseURI();
        return
            bytes(base).length > 0
                ? string(
                    abi.encodePacked(base, Strings.toString(tokenId), ".json")
                )
                : "";
    }

    // Minting function that transfers mint price to royaltiesReceiver
    function safeMint(address to) public payable {
        require(_nextTokenId <= TOTAL_SUPPLY, "Exceeds total supply");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        currentSupply++;

        // Transfer funds to the royaltiesReceiver
        payable(royaltiesReceiver).transfer(msg.value);
    }

    // Batch mint function that transfers mint price to royaltiesReceiver for each token
    function batchMintNFT(address to, uint256 quantity) external payable {
        require(
            _nextTokenId + quantity <= TOTAL_SUPPLY,
            "Exceeds total supply"
        );
        
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, _nextTokenId);
            _nextTokenId++;
            currentSupply++;
        }

        // Transfer the funds to the royaltiesReceiver
        payable(royaltiesReceiver).transfer(msg.value);
    }

    // Withdraw funds from the contract to the owner
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        payable(owner()).transfer(balance);
    }

    // Function to transfer contract ownership - only the current owner can call
    function transferContractOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        transferOwnership(newOwner);
    }

    // Function to update the royalties receiver - only the owner can call
    function setRoyaltiesReceiver(address newRoyaltiesReceiver) external onlyOwner {
        require(newRoyaltiesReceiver != address(0), "New royalties receiver is the zero address");

        // Update the royalties receiver
        royaltiesReceiver = newRoyaltiesReceiver;

        // Update the default royalty information
        _setDefaultRoyalty(newRoyaltiesReceiver, royaltyPercentage);
    }

    // Function to update the royalty percentage dynamically
    function setRoyaltyPercentage(uint96 newRoyaltyPercentage) external onlyOwner {
        require(newRoyaltyPercentage <= 1000, "Max royalty is 10%"); // Limit to 10% (1000 basis points)

        // Update the royalty percentage
        royaltyPercentage = newRoyaltyPercentage;

        // Update the default royalty information
        _setDefaultRoyalty(royaltiesReceiver, royaltyPercentage);
    }

    // Override for royalty support (ERC2981)
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
