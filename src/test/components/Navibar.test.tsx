import { render } from "@testing-library/react";
import Navibar from "../../components/Navibar";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../../context/UserContext";

describe('Navibar', () => {
  describe('正常系', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      render(
      <MemoryRouter>
        <UserProvider>
          <Navibar />
        </UserProvider>
      </MemoryRouter>
      );
    });

  it('メニュー開閉の確認', () => {});
  })
})