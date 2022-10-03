import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import {MdOutlineUpload, MdHardware} from 'react-icons/md'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import GroupWorkRoundedIcon from '@mui/icons-material/GroupWorkRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export const SidebarData = [
    {
      title: "Dashboard",
      path: "/AxiomProtect/DashBoard",
      // icon: <AiIcons.AiFillHome />,
      icon: <DashboardCustomizeRoundedIcon sx={{fontSize:"medium"}}/>,
      exact: true,
    },
    // {
    //   title: "Device Insights",
    //   path: "/DeviceInsights",
    //   icon: <IoIcons.IoIosPaper />,
    // },
    {
      title: "Policy",
      path: "/AxiomProtect/Policy",
      // icon: <IoIcons.IoIosPaper />,
      icon: <PolicyRoundedIcon sx={{fontSize:"medium"}}/>,
      exact: true,
    },
    {
      title: "Applications",
      path: "/AxiomProtect/Applications",
      icon: <IoIcons.IoIosPaper />,
      // iconClosed: <RiIcons.RiArrowDownSFill />,
      // iconOpened: <RiIcons.RiArrowUpSFill />,
    
      // subNav: [
      //   {
      //     title: "Radius",
      //     path: "/Applications/Radius",
      //     icon: <IoIcons.IoIosPaper />,
      //   },
      //   {
      //     title: "Custom",
      //     path: "/Applications/Custom",
      //     icon: <IoIcons.IoIosPaper />,
      //   },
      // ],
    },
    {
      title: "Users",
      path: "/AxiomProtect/Users",
      icon: <AccountCircleRoundedIcon sx={{fontSize:"medium"}} />,
      // iconClosed: <RiIcons.RiArrowDownSFill />,
      // iconOpened: <RiIcons.RiArrowUpSFill />,
    
      // subNav: [
      //   {
      //     title: "Add User",
      //     path: "/Users/AddUser",
      //     icon: <IoIcons.IoIosPaper />,
      //   },
      // ],
    },
    {
        title: "Groups",
        path: "/AxiomProtect/Groups",
        icon: <PeopleAltRoundedIcon sx={{fontSize:"medium"}} />,
        // iconClosed: <RiIcons.RiArrowDownSFill />,
        // iconOpened: <RiIcons.RiArrowUpSFill />,

        // subNav: [
        //   {
        //     title: "Add Group",
        //     path: "/AddGroup",
        //     icon: <IoIcons.IoIosPaper />,
        //   },
        // ],
    },
    // {
    //     title: "Endpoints",
    //     path: "/Endpoints",
    //     icon: <IoIcons.IoIosPaper />,
    // },
    {
      title: "Teams",
      path: "/AxiomProtect/Teams",
      icon: <GroupWorkRoundedIcon sx={{fontSize:"medium"}}/>,
      // iconClosed: <RiIcons.RiArrowDownSFill />,
      // iconOpened: <RiIcons.RiArrowUpSFill />,

      //   subNav: [
      //     {
      //       title: "Team Members",
      //       path: "/TeamMember",
      //       icon: <IoIcons.IoIosPaper />,
      //     },
      //   ],
    },
    {
        title: "Administrator",
        path: "/AxiomProtect/Administrator",
        icon: <AdminPanelSettingsRoundedIcon sx={{fontSize:"medium"}} />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            title: "Import Token",
            path: "/AxiomProtect/hardware-token-upload",
            icon: <FaIcons.FaEyeDropper/>,
          },
          {
            title: "Bulk Assign",
            path: "/AxiomProtect/uploadBatch",
            icon: <AiIcons.AiOutlineCloudUpload />,
          },
          {
            title: "Bulk Users",
            path: "/AxiomProtect/uploadBulkUsers",
            icon: <AiIcons.AiOutlineCloudUpload />,
          },
        ]
    },
    // {
    //     title: "Trust Monitor",
    //     path: "/TrustMonitor",
    //     icon: <IoIcons.IoIosPaper />,
    // },
    {
        title: "Reports",
        path: "/AxiomProtect/UserReports",
        icon: <AssessmentRoundedIcon sx={{fontSize:"medium"}} />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
          {
            title: "User Reports",
            path: "/AxiomProtect/UserReports",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "Application Reports",
            path: "/AxiomProtect/ApplicationReports",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "Administrator Reports",
            path: "/AxiomProtect/AdministratorReports",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "Authentication Reports",
            path: "/AxiomProtect/AuthenticationReports",
            icon: <IoIcons.IoIosPaper />,
          },

          {
            title: "Tokenization Report",
            path: "/AxiomProtect/TokenizationReport",
            icon: <IoIcons.IoIosPaper />,
          },

          // {
          //   title: "Policy Reports",
          //   path: "/AxiomProtect/PolicyReports",
          //   icon: <IoIcons.IoIosPaper />,
          // },
          {
            title: "Device Reports",
            path: "/AxiomProtect/DeviceReports",
            icon: <IoIcons.IoIosPaper />,
          },
          // {
          //   title: "Sonic KYC Reports",
          //   path: "/AxiomProtect/SonicKYCReports",
          //   icon: <IoIcons.IoIosPaper />,
          // },
          {
            title: "Push Reports",
            path: "/AxiomProtect/PushReports",
            icon: <IoIcons.IoIosPaper />,
          },

          {
            title: "RBA Reports",
            path: "/AxiomProtect/RBAReports",
            icon: <IoIcons.IoIosPaper />,
          },

          // {
          //   title: "Transaction Monitor Report",
          //   path: "/AxiomProtect/TransactionMonitorReport",
          //   icon: <IoIcons.IoIosPaper />,
          // },

          // {
          //   title: "Merchant Transaction Report",
          //   path: "/AxiomProtect/MerchantTransactionReport",
          //   icon: <IoIcons.IoIosPaper />,
          // },

          {
            title: "OTP Token Report",
            path: "/AxiomProtect/OTPTokenReports",
            icon: <IoIcons.IoIosPaper />,
          },
        ],
    },
    // {
    //     title: "Gateway",
    //     path: "/Gateway",
    //     icon: <IoIcons.IoIosPaper />,
    // },
    // {
    //     title: "Billing",
    //     path: "/Billing",
    //     icon: <IoIcons.IoIosPaper />,
    // },
    {
      title: "Setting",
      path: "/AxiomProtect/Settings",
      icon: <SettingsRoundedIcon sx={{fontSize:"medium"}} />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
          // {
          //   title: "Access Management",
          //   path: "/AxiomProtect/AccessControl",
          //   icon: <IoIcons.IoIosPaper />,
          // },
          {
            title: "User Source Configuration",
            path: "/AxiomProtect/Settings",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "Radius Server Config",
            path: "/AxiomProtect/RadiusServerConfig",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "Operator Source",
            path: "/AxiomProtect/OperatorSourceConfig",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "OTP Token",
            path: "/AxiomProtect/OTPToken",
            icon: <IoIcons.IoIosPaper />,
          },

          {
            title: "PushSetting",
            path: "/AxiomProtect/PushSetting",
            icon: <IoIcons.IoIosPaper />,
          },

          {
            title: "Tokenization",
            path: "/AxiomProtect/TokenizationClient",
            icon: <IoIcons.IoIosPaper />,
          },

          {
            title: "RBA Settings",
            path: "/AxiomProtect/RBASettings",
            icon: <IoIcons.IoIosPaper />,
          },
        ],
    },
  ];