import { store } from "@/redux/store";
import { Provider as Provider_ } from "react-redux";

export function Provider({ children }: { children: React.ReactNode }) {
  return <Provider_ store={store}>{children}</Provider_>;
}
