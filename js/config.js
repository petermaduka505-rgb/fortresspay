/**
 * js/config.js
 * Single source of truth for all credentials, user profile data,
 * and seed configuration. Edit ONLY this file to change login details.
 */

const FP_CONFIG = {
  /* ------------------------------------------------------------------ */
  /*  CREDENTIALS — change email and password here only                  */
  /* ------------------------------------------------------------------ */
  // lastName: "Chan",
  //   firstName: "Eason",
  user: {
    id: "usr_001",
    email: "easonchanyinkshun@gmail.com",
    password: "EASONCHAN27",
    firstName: "Margrate",
    lastName: "Ola",
    phone: "+1 (908) 251-9984",
    address:
      "14F, Manning House, 38-48 Queen's Road Central, Central, Hong Kong",
    accountNumber: "**** **** **** 7240",
    accountType: "Fixed Deposit Account",
    routingNumber: "021****21",
    memberSince: "January 2017",
    restricted: true,
  },

  /* ------------------------------------------------------------------ */
  /*  TRANSACTION SEED CONFIG                                             */
  /* ------------------------------------------------------------------ */
  transaction: {
    sender: "Stonebridge Holdings",
    senderAccount: "**** 4831",
    method: "Bank Transfer",
    status: "Completed",
    /* Day-of-month and time used for every transaction */
    day: 28,
    time: "09:15",
    /* Target total — do not change */
    targetTotal: 3750059.0,
  },

  /* ------------------------------------------------------------------ */
  /*  NOTIFICATIONS SEED (latest first)                                 */
  /* ------------------------------------------------------------------ */
  notifications: [
    {
      id: "notif_006",
      title: "Geographic restriction applied",
      body: "Outgoing transfers and payments are unavailable from your current location. Outgoing account features are supported only within domestic U.S. borders. Incoming bank transfer credits remain available.",
      date: "January 14, 2025",
      read: false,
    },
    {
      id: "notif_005",
      title: "Profile Updated",
      body: "Your contact information was successfully updated.",
      date: "November 3, 2024",
      read: true,
    },
    {
      id: "notif_004",
      title: "Security Alert",
      body: "Your account was accessed from a new device. If this was not you, contact support immediately.",
      date: "September 10, 2024",
      read: true,
    },
    {
      id: "notif_003",
      title: "Account update",
      body: "Your fixed deposit terms and posting schedule remain unchanged. Incoming monthly credits will continue to be processed via bank transfer.",
      date: "February 28, 2024",
      read: true,
    },
    {
      id: "notif_002",
      title: "Statement Available",
      body: "Your account statement for Q1 2023 is now available.",
      date: "April 1, 2023",
      read: true,
    },
    {
      id: "notif_001",
      title: "Account opened",
      body: "Your Fixed Deposit Account is active and ready to receive incoming bank transfer credits.",
      date: "January 3, 2017",
      read: true,
    },
  ],
};
