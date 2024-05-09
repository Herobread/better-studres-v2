import Commands from "@src/components/command/Commands";
import Providers from "./Providers";

export default function CommandsRoot() {
	return <div className="">
		<Providers>
			<Commands />
		</Providers>
	</div>
}