
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Mail,
  Phone,
  ArrowLeft,
  MapPin,
  ShoppingBag,
  CreditCard,
  Bell,
  User,
  Database,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LegalPage({ title = "Privacy Policy" }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-root">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container nav-content">
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "var(--color-brand)",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap fill="#fff" size={16} />
            </div>

            <h2
              style={{
                fontSize: "1.4rem",
                letterSpacing: "-0.05em",
                margin: 0,
              }}
            >
              FOOD MITHRA
            </h2>
          </Link>

          <Link
            to="/"
            className="btn-premium"
            style={{
              padding: "0.6rem 2rem",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ArrowLeft size={16} />
            RETURN TO GRID
          </Link>
        </div>
      </nav>

      {/* MAIN SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="section"
        style={{
          paddingTop: "15rem",
          paddingBottom: "8rem",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "8rem",
            }}
          >
            {/* LEFT SIDE */}
            <div>
              <div className="accent-line" />

              <span
                style={{
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.75rem",
                  color: "var(--color-brand)",
                }}
              >
                Governance Documentation
              </span>

              <h1
                className="display-2"
                style={{
                  marginTop: "2rem",
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  marginTop: "2rem",
                  color: "var(--color-slate)",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                }}
              >
                Your privacy is important to Food Mithra. This Privacy Policy
                explains how we collect, use, store, protect, and share
                information when you use our food ordering and delivery
                services.
              </p>

              <div
                style={{
                  marginTop: "5rem",
                  display: "grid",
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                    color: "var(--color-slate)",
                  }}
                >
                  <ShieldCheck
                    size={20}
                    color="var(--color-brand)"
                  />

                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    PRIVACY_PROTECTED
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                    color: "var(--color-slate)",
                  }}
                >
                  <MapPin
                    size={20}
                    color="var(--color-brand)"
                  />

                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    LOCATION_TRANSPARENCY
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                    color: "var(--color-slate)",
                  }}
                >
                  <Zap
                    size={20}
                    color="var(--color-brand)"
                  />

                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    LATEST_SYNC: 2026
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div
              className="card-luxe"
              style={{
                background: "var(--color-bone)",
                border: "none",
                padding: "4rem",
              }}
            >
              <div
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  fontWeight: 400,
                  color: "var(--color-ink)",
                }}
              >
                {/* LAST UPDATED */}
                <div
                  style={{
                    marginBottom: "3rem",
                    padding: "1rem 1.5rem",
                    background: "rgba(0,0,0,0.03)",
                    borderRadius: "8px",
                  }}
                >
                  <strong>Last Updated:</strong> August 10, 2026
                </div>

                {/* INTRODUCTION */}
                <section>
                  <h2>1. Introduction</h2>

                  <p>
                    Food Mithra ("Food Mithra", "we", "our", or "us") is a
                    food ordering and delivery platform that connects
                    customers with restaurants, food vendors, and delivery
                    partners.
                  </p>

                  <p>
                    This Privacy Policy explains what information we collect,
                    why we collect it, how we use it, how it may be shared,
                    how we protect it, and the choices available to you.
                  </p>

                  <p>
                    By using the Food Mithra application or related services,
                    you acknowledge the practices described in this Privacy
                    Policy.
                  </p>
                </section>

                {/* INFORMATION COLLECTED */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>2. Information We Collect</h2>

                  <p>
                    Depending on how you use Food Mithra, we may collect the
                    following categories of information.
                  </p>

                  <h3>2.1 Account Information</h3>

                  <p>
                    When you create or use an account, we may collect:
                  </p>

                  <ul>
                    <li>Name</li>
                    <li>Mobile phone number</li>
                    <li>Email address</li>
                    <li>Profile information</li>
                    <li>Login and authentication information</li>
                  </ul>

                  <h3>2.2 Delivery Address</h3>

                  <p>
                    We may collect and store delivery addresses provided by
                    you so that restaurants and delivery partners can
                    accurately prepare and deliver your order.
                  </p>
                </section>

                {/* LOCATION */}
                <section style={{ marginTop: "4rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <MapPin
                      size={28}
                      color="var(--color-brand)"
                    />

                    <h2 style={{ margin: 0 }}>
                      3. Location Information
                    </h2>
                  </div>

                  <p>
                    Food Mithra may access your device's location information
                    when you grant location permission to the application.
                  </p>

                  <p>
                    Location information may include your approximate or
                    precise geographic location, depending on the permissions
                    granted by your device and operating system.
                  </p>

                  <h3>3.1 Why We Use Location Information</h3>

                  <p>
                    We use location information for the following purposes:
                  </p>

                  <ul>
                    <li>
                      To identify your current location.
                    </li>

                    <li>
                      To help you select or confirm your delivery location.
                    </li>

                    <li>
                      To display restaurants, vendors, and services available
                      near your location.
                    </li>

                    <li>
                      To calculate delivery availability and delivery
                      distance.
                    </li>

                    <li>
                      To help delivery partners navigate to restaurant,
                      vendor, and customer locations.
                    </li>

                    <li>
                      To provide delivery tracking and order status updates.
                    </li>

                    <li>
                      To improve the accuracy and functionality of
                      location-based services.
                    </li>

                    <li>
                      To prevent fraudulent or unauthorized activity where
                      location information is reasonably necessary.
                    </li>
                  </ul>

                  <h3>3.2 Location Permission</h3>

                  <p>
                    Location access is subject to the permissions provided by
                    you through your device settings.
                  </p>

                  <p>
                    You can enable or disable location permissions at any time
                    through your device settings. If you disable location
                    access, some Food Mithra features, including location
                    based restaurant discovery, address selection, delivery
                    tracking, or navigation-related functionality, may not
                    work correctly.
                  </p>

                  <h3>3.3 Delivery Partner Location</h3>

                  <p>
                    If you use Food Mithra as a delivery partner, the
                    application may access location information while you are
                    performing delivery-related activities. This may be used
                    to provide delivery navigation, order tracking, estimated
                    arrival information, and operational support.
                  </p>

                  <p>
                    Location access for delivery functionality is handled in
                    accordance with the permissions and settings available on
                    your device.
                  </p>
                </section>

                {/* ORDERS */}
                <section style={{ marginTop: "4rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <ShoppingBag
                      size={28}
                      color="var(--color-brand)"
                    />

                    <h2 style={{ margin: 0 }}>
                      4. Orders and Transaction Information
                    </h2>
                  </div>

                  <p>
                    When you place an order through Food Mithra, we may
                    collect information related to the order, including:
                  </p>

                  <ul>
                    <li>Order details</li>
                    <li>Restaurant or vendor information</li>
                    <li>Items ordered</li>
                    <li>Order amount</li>
                    <li>Delivery address</li>
                    <li>Order status</li>
                    <li>Delivery information</li>
                    <li>Cancellation and refund information</li>
                  </ul>

                  <p>
                    This information is used to process, manage, deliver, and
                    provide support for your orders.
                  </p>
                </section>

                {/* PAYMENT */}
                <section style={{ marginTop: "4rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <CreditCard
                      size={28}
                      color="var(--color-brand)"
                    />

                    <h2 style={{ margin: 0 }}>
                      5. Payment Information
                    </h2>
                  </div>

                  <p>
                    Food Mithra may use third-party payment service providers
                    to process payments.
                  </p>

                  <p>
                    Depending on the payment method selected, payment
                    providers may process information such as transaction
                    identifiers, payment status, and other information
                    necessary to complete a transaction.
                  </p>

                  <p>
                    We do not intend to store complete card numbers, CVV
                    numbers, UPI PINs, or banking passwords on our servers.
                    Such sensitive payment information is handled by the
                    relevant payment service provider according to its own
                    privacy and security policies.
                  </p>
                </section>

                {/* RESTAURANTS / VENDORS */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>6. Restaurants and Food Vendors</h2>

                  <p>
                    Food Mithra may share necessary order information with
                    the restaurant or food vendor responsible for preparing
                    your order.
                  </p>

                  <p>
                    Information may include your name, order details,
                    delivery requirements, and delivery address where
                    necessary to fulfil the order.
                  </p>
                </section>

                {/* DELIVERY PARTNERS */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>7. Delivery Partners</h2>

                  <p>
                    To complete a delivery, necessary information may be
                    provided to the assigned delivery partner.
                  </p>

                  <p>
                    This may include:
                  </p>

                  <ul>
                    <li>Customer name</li>
                    <li>Delivery address</li>
                    <li>Order information</li>
                    <li>Contact information where required</li>
                    <li>Relevant location information</li>
                    <li>Delivery instructions</li>
                  </ul>

                  <p>
                    This information is used only as reasonably necessary to
                    complete and manage the delivery.
                  </p>
                </section>

                {/* DEVICE */}
                <section style={{ marginTop: "4rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Database
                      size={28}
                      color="var(--color-brand)"
                    />

                    <h2 style={{ margin: 0 }}>
                      8. Device and Technical Information
                    </h2>
                  </div>

                  <p>
                    We may automatically receive certain technical information
                    when you use the application, such as:
                  </p>

                  <ul>
                    <li>Device type</li>
                    <li>Operating system</li>
                    <li>Application version</li>
                    <li>Device identifiers where applicable</li>
                    <li>IP address</li>
                    <li>Network information</li>
                    <li>Crash and diagnostic information</li>
                  </ul>

                  <p>
                    This information may be used to maintain application
                    security, diagnose technical problems, improve
                    performance, and provide a reliable service.
                  </p>
                </section>

                {/* NOTIFICATIONS */}
                <section style={{ marginTop: "4rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Bell
                      size={28}
                      color="var(--color-brand)"
                    />

                    <h2 style={{ margin: 0 }}>
                      9. Notifications
                    </h2>
                  </div>

                  <p>
                    Food Mithra may send push notifications relating to your
                    account, orders, payments, delivery status, offers, and
                    important service information.
                  </p>

                  <p>
                    You can manage notification permissions through your
                    device settings.
                  </p>
                </section>

                {/* CONTACT */}
                <section style={{ marginTop: "4rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <User
                      size={28}
                      color="var(--color-brand)"
                    />

                    <h2 style={{ margin: 0 }}>
                      10. Customer Support
                    </h2>
                  </div>

                  <p>
                    If you contact Food Mithra customer support, we may
                    collect information necessary to understand and resolve
                    your request.
                  </p>

                  <p>
                    This may include your name, phone number, order details,
                    screenshots, messages, and other information that you
                    voluntarily provide.
                  </p>
                </section>

                {/* HOW WE USE */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>11. How We Use Information</h2>

                  <p>
                    We may use information collected through Food Mithra to:
                  </p>

                  <ul>
                    <li>Create and manage user accounts.</li>
                    <li>Process food orders.</li>
                    <li>Coordinate restaurant and vendor fulfilment.</li>
                    <li>Coordinate delivery services.</li>
                    <li>Provide location-based functionality.</li>
                    <li>Process payments and refunds.</li>
                    <li>Provide customer support.</li>
                    <li>Send service-related notifications.</li>
                    <li>Prevent fraud and unauthorized activity.</li>
                    <li>Maintain application security.</li>
                    <li>Improve our products and services.</li>
                    <li>Comply with applicable laws and regulations.</li>
                  </ul>
                </section>

                {/* SHARING */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>12. Information Sharing</h2>

                  <p>
                    We may share information with trusted parties when
                    reasonably necessary to provide Food Mithra services.
                  </p>

                  <p>This may include:</p>

                  <ul>
                    <li>Restaurants and food vendors</li>
                    <li>Delivery partners</li>
                    <li>Payment service providers</li>
                    <li>Cloud hosting providers</li>
                    <li>Analytics and technical service providers</li>
                    <li>Customer support providers</li>
                    <li>Government or law-enforcement authorities when legally required</li>
                  </ul>

                  <p>
                    We do not sell users' personal information.
                  </p>
                </section>

                {/* SECURITY */}
                <section style={{ marginTop: "4rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <ShieldCheck
                      size={28}
                      color="var(--color-brand)"
                    />

                    <h2 style={{ margin: 0 }}>
                      13. Data Security
                    </h2>
                  </div>

                  <p>
                    We use reasonable technical and organizational security
                    measures to protect information against unauthorized
                    access, loss, misuse, alteration, or disclosure.
                  </p>

                  <p>
                    However, no internet transmission or electronic storage
                    system can be guaranteed to be completely secure.
                  </p>
                </section>

                {/* RETENTION */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>14. Data Retention</h2>

                  <p>
                    We retain personal information only for as long as
                    reasonably necessary to provide our services, fulfil
                    transactions, maintain business and financial records,
                    comply with legal obligations, resolve disputes, and
                    enforce our agreements.
                  </p>

                  <p>
                    When information is no longer required, we may delete,
                    anonymize, or securely dispose of it in accordance with
                    applicable requirements.
                  </p>
                </section>

                {/* DELETE ACCOUNT */}
                <section style={{ marginTop: "4rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Trash2
                      size={28}
                      color="var(--color-brand)"
                    />

                    <h2 style={{ margin: 0 }}>
                      15. Account and Data Deletion
                    </h2>
                  </div>

                  <p>
                    Users may request deletion of their Food Mithra account
                    and associated personal information.
                  </p>

                  <p>
                    Some information may need to be retained where required
                    by law, for legitimate business purposes, fraud
                    prevention, financial records, dispute resolution, or
                    other lawful requirements.
                  </p>

                  <p>
                    To request account or data deletion, contact Food Mithra
                    using the contact information provided below.
                  </p>
                </section>

                {/* PERMISSIONS */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>16. Application Permissions</h2>

                  <p>
                    Depending on the features you use, Food Mithra may request
                    access to certain device permissions.
                  </p>

                  <ul>
                    <li>
                      <strong>Location:</strong> Used for delivery addresses,
                      nearby restaurants, delivery tracking, navigation, and
                      location-based services.
                    </li>

                    <li>
                      <strong>Notifications:</strong> Used to provide order,
                      delivery, payment, and service updates.
                    </li>

                    <li>
                      <strong>Camera:</strong> May be used when a feature
                      requires capturing or uploading an image.
                    </li>

                    <li>
                      <strong>Photos/Media:</strong> May be used when you
                      choose to upload images or other media through the
                      application.
                    </li>
                  </ul>

                  <p>
                    You can manage these permissions through your device
                    settings. Certain features may not function if required
                    permissions are disabled.
                  </p>
                </section>

                {/* THIRD PARTY */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>17. Third-Party Services</h2>

                  <p>
                    Food Mithra may use third-party services for functions
                    such as payment processing, cloud hosting, maps,
                    notifications, analytics, crash reporting, authentication,
                    and other infrastructure services.
                  </p>

                  <p>
                    These third parties may process information according to
                    their own privacy policies and applicable agreements.
                  </p>
                </section>

                {/* CHILDREN */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>18. Children's Privacy</h2>

                  <p>
                    Food Mithra is not intended for children under the age of
                    13. We do not knowingly collect personal information from
                    children under 13.
                  </p>

                  <p>
                    If you believe that a child has provided personal
                    information to us, please contact us so that appropriate
                    action can be taken.
                  </p>
                </section>

                {/* USER RIGHTS */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>19. Your Privacy Choices</h2>

                  <p>
                    Depending on applicable law, you may have rights relating
                    to your personal information, including requesting access,
                    correction, deletion, or restriction of certain processing.
                  </p>

                  <p>
                    You may also control certain permissions through your
                    device settings, including location and notifications.
                  </p>
                </section>

                {/* POLICY CHANGES */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>20. Changes to This Privacy Policy</h2>

                  <p>
                    We may update this Privacy Policy from time to time to
                    reflect changes to our services, technology, legal
                    requirements, or privacy practices.
                  </p>

                  <p>
                    When we make changes, we will update the "Last Updated"
                    date displayed at the beginning of this Privacy Policy.
                  </p>
                </section>

                {/* CONTACT */}
                <section style={{ marginTop: "4rem" }}>
                  <h2>21. Contact Us</h2>

                  <p>
                    If you have questions about this Privacy Policy, our data
                    practices, or wish to request account or data deletion,
                    please contact Food Mithra.
                  </p>

                  <div
                    style={{
                      marginTop: "2rem",
                      padding: "2rem",
                      background: "rgba(0,0,0,0.03)",
                      borderRadius: "10px",
                    }}
                  >
                    <p>
                      <strong>Food Mithra</strong>
                    </p>

                    <p>
                      <strong>Company:</strong> MITHRA SOLUTIONS PRIVATE
                      LIMITED
                    </p>

                    <p>
                      <strong>Email:</strong> support@foodmithra.com
                    </p>

                    <p>
                      <strong>Website:</strong> foodmithra.com
                    </p>
                  </div>
                </section>

                {/* STANDARD PROTOCOL */}
                <div
                  style={{
                    marginTop: "6rem",
                    paddingTop: "4rem",
                    borderTop:
                      "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 900,
                      marginBottom: "2rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    MITHRA STANDARD PROTOCOL
                  </h5>

                  <p
                    style={{
                      color: "var(--color-ghost)",
                      fontSize: "1rem",
                      lineHeight: 1.8,
                    }}
                  >
                    Food Mithra is committed to responsible handling of user
                    information and transparent operation of its food ordering
                    and delivery ecosystem. Information is processed only for
                    legitimate business, operational, security, legal, and
                    service-related purposes. We aim to maintain appropriate
                    safeguards while providing reliable food ordering,
                    restaurant, vendor, and delivery services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer
        className="section"
        style={{
          background: "var(--color-ink)",
          color: "#fff",
          padding: "6rem 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: "1.2rem",
                letterSpacing: "-0.05em",
              }}
            >
              MITHRA_SYSTEMS © 2026
            </div>

            <div
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <Mail size={20} />
              <Phone size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

