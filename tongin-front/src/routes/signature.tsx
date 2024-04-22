import { useState } from "react";
import ContractFinish from "../components/contractFinish";
import SignatureLayout from "../components/signatureLayout";

export default function Signature() {
  const [onContractFinishPage, setOnContractFinishPage] =
    useState<boolean>(false);
  return (
    <>
      {onContractFinishPage ? (
        <ContractFinish></ContractFinish>
      ) : (
        <SignatureLayout setOnContractFinishPage={setOnContractFinishPage} />
      )}
    </>
  );
}
