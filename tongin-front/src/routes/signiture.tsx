import { useState } from "react";
import SignitureLayout from "../components/signitureLayout";
import ContractFinish from "../components/contractFinish";

export default function Signiture() {
  const [onContractFinishPage, setOnContractFinishPage] =
    useState<boolean>(false);
  return (
    <>
      {onContractFinishPage ? (
        <ContractFinish></ContractFinish>
      ) : (
        <SignitureLayout setOnContractFinishPage={setOnContractFinishPage} />
      )}
    </>
  );
}
