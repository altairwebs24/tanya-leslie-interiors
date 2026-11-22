import { describe, expect, it } from "vitest";

import {
  defaultStudioContent,
  mergeStudioContent,
  publicStorageUrl,
} from "@/lib/studio-content";

describe("studio content helpers", () => {
  it("returns an empty string instead of throwing when a storage path is missing", () => {
    expect(publicStorageUrl(undefined)).toBe("");
    expect(publicStorageUrl(null)).toBe("");
    expect(publicStorageUrl("")).toBe("");
  });

  it("keeps default studio fields when remote JSON omits them", () => {
    const merged = mergeStudioContent({ brandName: "KR8 ENTITIES" });

    expect(merged.logo).toBe(defaultStudioContent.logo);
    expect(merged.heroImage).toBe(defaultStudioContent.heroImage);
    expect(merged.services).toEqual(defaultStudioContent.services);
    expect(merged.projects).toEqual(defaultStudioContent.projects);
  });
});