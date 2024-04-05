import { ActionIcon, CopyButton, Input, Tooltip } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { IconCheck, IconCopy, IconLink } from "@tabler/icons-react";
import React from "react";

interface newPixelDetailsProps {
  data: {
    imageUrl: string;
    html: string;
  };
}

export default function PixelDetailsModal({ data }: newPixelDetailsProps) {
  return (
    <>
      <Input
        icon={<IconLink />}
        variant="filled"
        placeholder="Image URL"
        disabled
        value={data.imageUrl}
        rightSection={
          <CopyButton value={data.imageUrl} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        }
        mb={5}
      />
      <Prism language="tsx">{data.html}</Prism>
    </>
  );
}
