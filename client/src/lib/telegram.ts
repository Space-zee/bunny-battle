import { BackButton, MainButton, WebApp } from "@twa-dev/types";

const tealColor400 = "#2ED3B7";

export class TgButtons {
  public mainButton: MainButton;
  public backButton: BackButton;
  private mainButtonOnClick: (() => void) | null;
  private backButtonOnClick: (() => void) | null;

  constructor(webApp: WebApp) {
    this.mainButton = webApp.MainButton;
    this.backButton = webApp.BackButton;
    this.mainButtonOnClick = null;
    this.backButtonOnClick = null;
  }

  showMainButton = (
    onClick: () => void,
    params: {
      color?: string;
      text?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }
  ) => {
    if (this.mainButtonOnClick) {
      this.mainButton.offClick(this.mainButtonOnClick);
      this.mainButtonOnClick = null;
    }
    if (!params.is_active) {
      params.color = tealColor400;
      params.text_color = tealColor400;
    }
    this.mainButton.show();
    this.mainButtonOnClick = onClick;
    this.mainButton.setParams(params);
    if (this.mainButtonOnClick) {
      this.mainButton.onClick(this.mainButtonOnClick);
    }
  };

  hideMainButton = () => {
    this.mainButton.hide();
    this.mainButton.hideProgress();
    if (this.mainButtonOnClick) {
      this.mainButton.offClick(this.mainButtonOnClick);
      this.mainButtonOnClick = null;
    }
  };

  showBackButton = (onClick: () => void) => {
    if (this.backButtonOnClick) {
      this.hideBackButton();
    }
    this.backButton.show();
    this.backButtonOnClick = onClick;
    if (this.backButtonOnClick) {
      this.backButton.onClick(this.backButtonOnClick);
    }
  };

  hideBackButton = () => {
    this.backButton.hide();
    if (this.backButtonOnClick) {
      this.backButton.offClick(this.backButtonOnClick);
      this.backButtonOnClick = null;
    }
  };
}
