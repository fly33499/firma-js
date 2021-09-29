import { expect } from 'chai';
import { FirmaSDK } from "../sdk/FirmaSDK"
import { FirmaConfig } from "../sdk/FirmaConfig"
import { NftItemType } from '../sdk/firmachain/nft';

describe('[NFT 테스트]', () => {

	const aliceMnemonic = "ozone unfold device pave lemon potato omit insect column wise cover hint narrow large provide kidney episode clay notable milk mention dizzy muffin crazy";
	const firma = new FirmaSDK(FirmaConfig.LocalDevNetConfig);;

	it('NFT getBalanceOf', async () => {

		let wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		var totalNft = await firma.Nft.getBalanceOf((await wallet.getAddress()));

		expect(totalNft).to.be.equal(totalNft);
		expect(totalNft).to.be.greaterThan(0);
	});

	it('NFT getTokenOfOwnerByIndex', async () => {

		let wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);

		var nftItem = await firma.Nft.getTokenOfOwnerByIndex(await wallet.getAddress(), 0);
		//expect(totalNft).to.be.greaterThan(0);
		expect(nftItem.id).not.equal("");
	});
  
	it('NFT getNftItemAllFromAddress-Pagination', async () => {

		let wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		var address = await wallet.getAddress();

		var result = await firma.Nft.getNftItemAllFromAddress(address);
		const total = result.pagination.total;

		var totalItemList: NftItemType[] = [];
		var index = 0;

		while (result.pagination.next_key != "") {

			for (var i = 0; i < result.dataList.length; i++) {
				totalItemList[index++] = result.dataList[i];
			}

			result = await firma.Nft.getNftItemAllFromAddress(address, result.pagination.next_key);
		}

		// result.pagination.next_key == null때는 로직이 끝나는 것이라, 나머지도 받아 준다. 
		// 100개 이상일 경우, 순서적으로 제일 마지막에 호출되어야 하는 코드임
		for (var i = 0; i < result.dataList.length; i++) {
			totalItemList[index++] = result.dataList[i];
		}
		
		expect(totalItemList.length).to.be.equal(total);
	});


	it('NFT getNftItemAllFromAddress', async () => {

		let wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);

		var nftItemList = await firma.Nft.getNftItemAllFromAddress(await wallet.getAddress());

		expect(nftItemList.dataList.length).to.be.equal(nftItemList.dataList.length);

		// 100개 이상 줄 수 없게 했음.
		//expect(nftItemList.dataList.length).to.be.equal(100);
		expect(nftItemList.dataList.length).to.be.greaterThan(0);
	});

	it('NFT getNftItemAll-pagination', async () => {

		var result = await firma.Nft.getNftItemAll();

		const total = result.pagination.total;

		var totalItemList: NftItemType[] = [];
		var index = 0;

		while (result.pagination.next_key != null) {

			for (var i = 0; i < result.dataList.length; i++) {
				totalItemList[index++] = result.dataList[i];
			}

			result = await firma.Nft.getNftItemAll(result.pagination.next_key);
		}

		// result.pagination.next_key == null때는 로직이 끝나는 것이라, 나머지도 받아 준다. 
		// 100개 이상일 경우, 순서적으로 제일 마지막에 호출되어야 하는 코드임
		for (var i = 0; i < result.dataList.length; i++) {
			totalItemList[index++] = result.dataList[i];
		}
		
		expect(totalItemList.length).to.be.equal(total);
	});

	it('NFT getNftItemAll', async () => {

		var result = await firma.Nft.getNftItemAll();

		expect(result.dataList.length).to.be.equal(result.dataList.length);
		expect(result.dataList.length).to.be.greaterThan(0);
	});
});