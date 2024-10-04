import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet"; // Import the correct wallet type

// Arweave initialization
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

/**
 * Upload a file to Arweave.
 * @param fileData - The file data (either image or JSON).
 * @param contentType - The MIME type of the file (e.g., 'image/png', 'application/json').
 * @param wallet - The user's Arweave wallet.
 * @returns The Arweave transaction ID.
 */
export async function uploadToArweave(
  fileData: Buffer,
  contentType: string,
  wallet: JWKInterface
): Promise<string> {
  try {
    // Create the transaction
    const transaction = await arweave.createTransaction(
      { data: fileData },
      wallet
    );
    transaction.addTag("Content-Type", contentType);

    // Sign the transaction
    await arweave.transactions.sign(transaction, wallet);

    // Post the transaction to Arweave
    const response = await arweave.transactions.post(transaction);

    console.log(response, "response");
    if (response.status === 200) {
      console.log(`Uploaded file. Transaction ID: ${transaction.id}`);
      return transaction.id;
    } else {
      console.error(
        `Upload failed with status ${response.status}: ${response.statusText}`
      );
      throw new Error("Failed to upload file to Arweave");
    }
  } catch (error: any) {
    console.error("Error uploading to Arweave:", error);
    throw new Error("Transaction verification failed: " + error.message);
  }
}

/**
 * Upload an NFT (image and metadata) to Arweave.
 * @param imageFile - The image file for the NFT.
 * @param metadata - The metadata object for the NFT.
 * @param wallet - The user's Arweave wallet.
 * @returns The Arweave transaction ID of the metadata JSON.
 */
export async function uploadNFT(
  imageFile: Buffer,
  metadata: object,
  wallet: JWKInterface
): Promise<string> {
  try {
    // Upload the image first
    const imageTransactionId = await uploadToArweave(
      imageFile,
      "image/png",
      wallet
    );
    const imageUrl = `https://arweave.net/${imageTransactionId}`;

    // Add the image URL to the metadata
    const metadataWithImage = {
      ...metadata,
      image: imageUrl, // Add the uploaded image's URL to the metadata
    };

    // Convert metadata to JSON
    const metadataJSON = Buffer.from(JSON.stringify(metadataWithImage));

    // Upload the metadata JSON
    const metadataTransactionId = await uploadToArweave(
      metadataJSON,
      "application/json",
      wallet
    );

    console.log(
      "Metadata uploaded with transaction ID:",
      metadataTransactionId
    );
    return metadataTransactionId;
  } catch (error) {
    console.error("Error uploading NFT:", error);
    throw error;
  }
}
