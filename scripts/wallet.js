let provider;
let signer;
let userAddress;

async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();

        document.getElementById('walletAddress').innerText = 'Wallet: ' + userAddress;
    } else {
        alert('MetaMask is not installed!');
    }
}

document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
