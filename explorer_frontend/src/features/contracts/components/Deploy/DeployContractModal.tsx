import {
  LabelLarge,
  Modal,
  ModalBody,
  ModalHeader,
  TAB_KIND,
  Tab,
  Tabs,
} from "@nilfoundation/ui-kit";
import {} from "@nilfoundation/ui-kit";
import type { TabsOverrides } from "baseui/tabs";
import { useUnit } from "effector-react";
import type { FC } from "react";
import { deploySmartContractFx, importSmartContractFx } from "../../models/base";
import { $activeComponent, setActiveComponent } from "../../models/base";
import { ActiveComponent } from "./ActiveComponent";
import { DeployTab } from "./DeployTab";
import { ImportContractTab } from "./ImportContractTab";

type DeployContractModalProps = {
  onClose?: () => void;
  isOpen?: boolean;
  name: string;
};

export const DeployContractModal: FC<DeployContractModalProps> = ({ onClose, isOpen, name }) => {
  const [activeComponent, deployPending, importExistingPending] = useUnit([
    $activeComponent,
    deploySmartContractFx.pending,
    importSmartContractFx.pending,
  ]);
  const tabsDisabled = deployPending || importExistingPending;

  return (
    <Modal
      autoFocus={false}
      isOpen={isOpen}
      onClose={onClose}
      size="min(770px, 80vw)"
      overrides={{
        Dialog: {
          style: {
            paddingBottom: 0,
            height: "557px",
          },
        },
      }}
    >
      <ModalHeader>
        <LabelLarge>{name}</LabelLarge>
      </ModalHeader>

      <div
        style={{
          overflow: "auto",
          height: "462px",
          paddingRight: "24px",
          paddingLeft: "5px",
        }}
      >
        <ModalBody>
          <Tabs
            activeKey={activeComponent}
            overrides={tabsOverrides}
            onChange={({ activeKey }) => setActiveComponent(activeKey as ActiveComponent)}
            disabled={tabsDisabled}
          >
            <Tab
              title="Deploy"
              key={ActiveComponent.Deploy}
              kind={TAB_KIND.primary}
              onClick={() => setActiveComponent(ActiveComponent.Deploy)}
            >
              <DeployTab />
            </Tab>
            <Tab
              title="Import Contract"
              kind={TAB_KIND.primary}
              key={ActiveComponent.Assign}
              onClick={() => setActiveComponent(ActiveComponent.Assign)}
            >
              <ImportContractTab />
            </Tab>
          </Tabs>
        </ModalBody>
      </div>
    </Modal>
  );
};

const tabsOverrides: TabsOverrides = {
  TabContent: {
    style: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  TabBar: {
    style: {
      paddingLeft: 100,
      paddingRight: 0,
    },
  },
  Tab: {
    style: {
      fontSize: "16px",
    },
  },
};
