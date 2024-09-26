// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TESTTEST is ERC721, Ownable {
    uint256 private _nextTokenId = 1;
    uint256 public constant TOTAL_SUPPLY = 7777;
    uint256 public EARLY_SALE_FEE = 0.05 ether;
    uint256 public PUBLIC_SALE_FEE = 0.10 ether;
    uint256 public currentSupply = 0;
    string private _baseURL;
    bool public isEarlySaleActive = true;

    constructor() ERC721("TESTTEST2", "TT") Ownable(msg.sender) {
        _baseURL = " ipfs://QmdQxi6fdLyMjTR8zcqjmmXWcxKyvnCxLMjmXUJ6pewsRz/";
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURL;
    }

    function setBaseURL(string memory newBaseURL) public onlyOwner {
        _baseURL = newBaseURL;
    }

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

    function safeMint(address to) public payable {
        uint256 fee = isEarlySaleActive ? EARLY_SALE_FEE : PUBLIC_SALE_FEE;
        require(msg.value == fee, "Incorrect minting fee");
        require(_nextTokenId <= TOTAL_SUPPLY, "Exceeds total supply");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        currentSupply++;
    }

    function batchMintNFT(address to, uint256 quantity) external payable {
        uint256 fee = isEarlySaleActive ? EARLY_SALE_FEE : PUBLIC_SALE_FEE;
        require(msg.value == fee * quantity, "Incorrect minting fee");
        require(
            _nextTokenId + quantity <= TOTAL_SUPPLY,
            "Exceeds total supply"
        );
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, _nextTokenId);
            _nextTokenId++;
            currentSupply++;
        }
    }

     function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function toggleSaleStatus() external onlyOwner {
        isEarlySaleActive = !isEarlySaleActive;
    }
}
