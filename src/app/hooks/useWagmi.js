import { config } from "../../config/config"
import { abi } from "../../config/contract-abi"
import { useReadContract, useAccount, useWriteContract } from 'wagmi'

const contractAddy = "0x70Af6C11d00dDf021b67d7A84687Bc654c7Ec18E";

export default function ReadContract() {
    const { address } = useAccount()
    const { data: hash, writeContract, isPending } = useWriteContract()

    const { data: allItems } = useReadContract({
        address: contractAddy,
        abi,
        functionName: 'getAllItems',
        args: [],
    })

    const listItem = async(name, price, image) => {
        try {
            const tx = await writeContract({
                address: contractAddy,
                abi,
                functionName: "listItem",
                args: [name, price, image],
            }) 
            
            console.log('tx', tx)
        } catch (error) {
            console.log("error in listing", error)
        }
    }

    const buyItem = async(itemId) => {
        try {
            const tx = await writeContract({
                address: contractAddy,
                abi,
                functionName: "buyItem",
                args: [itemId],
            }) 
            
            console.log('Transaction successful:', tx)
        } catch (error) {
            console.log("error in buying item", error)
        }
    }

    return {
        listItem,
        buyItem,
        address,
        isPending,
        allItems
    }
}