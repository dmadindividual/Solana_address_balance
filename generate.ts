import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { resolve } from '@bonfida/spl-name-service';

const getBalance = async (address: PublicKey, connection: Connection) => {
  try {
    const balance = await connection.getBalance(address);
    const balanceInSol = balance / LAMPORTS_PER_SOL;

    console.log(`The balance of the account at ${address.toBase58()} is ${balanceInSol} SOL`);
    console.log(`✅ Finished!`);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

const resolveDomainName = async (domain: string, connection: Connection): Promise<PublicKey | null> => {
  try {
    const publicKey = await resolve(connection, domain);
    return publicKey;
  } catch (error) {
    console.error(`Failed to resolve domain ${domain}:`, error);
    return null;
  }
}

const main = async () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const suppliedPublicKeyOrDomain = process.argv[2];

  if (!suppliedPublicKeyOrDomain) {
    console.error("Please provide a public key or a .sol domain as a command-line argument.");
    process.exit(1);
  }

  let publicKey: PublicKey | null = null;

  if (suppliedPublicKeyOrDomain.endsWith(".sol")) {
    publicKey = await resolveDomainName(suppliedPublicKeyOrDomain, connection);
  } else {
    try {
      publicKey = new PublicKey(suppliedPublicKeyOrDomain);
    } catch (error) {
      console.error("Invalid public key provided.");
      process.exit(1);
    }
  }

  if (publicKey) {
    await getBalance(publicKey, connection);
  } else {
    console.error("Failed to resolve the provided domain or the provided public key is invalid.");
    process.exit(1);
  }
}

main();
