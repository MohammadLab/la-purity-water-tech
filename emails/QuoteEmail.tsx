// emails/QuoteEmail.tsx
import * as React from "react";
import {
  Html, Head, Preview, Body, Container, Section, Heading, Text, Hr,
} from "@react-email/components";

type Props = {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  message: string;
  submittedAt?: Date;
};

export default function QuoteEmail({
  name, email, phone, city, message, submittedAt = new Date(),
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>New quote request from {name}</Preview>
      <Body style={{ backgroundColor: "#f7fafc", color: "#0D1B2A", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}>
        <Container style={{ margin: "24px auto", maxWidth: "640px", padding: "0 16px" }}>
          <Section style={{ background: "#ffffff", borderRadius: 16, boxShadow: "0 1px 8px rgba(0,0,0,.06)" }}>
            <div style={{ padding: 24 }}>
              <Heading as="h2" style={{ margin: 0, fontSize: 20 }}>New Quote Request</Heading>
              <Text style={{ marginTop: 4, color: "#475569" }}>
                Received {submittedAt.toLocaleString()}
              </Text>
              <Hr />
              <Text><b>Name:</b> {name}</Text>
              <Text><b>Email:</b> {email}</Text>
              {phone ? <Text><b>Phone:</b> {phone}</Text> : null}
              {city ? <Text><b>City:</b> {city}</Text> : null}
              <Hr />
              <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
            </div>
          </Section>
          <Text style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>
            LaPurity Water Tech • Windsor, Ontario
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
