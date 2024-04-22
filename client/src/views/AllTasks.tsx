import { Button, Card, Container, Row, Col } from "reactstrap";
import { useState } from "react";
import MongoTasks from "../components/MongoTasks";
import PostgresTasks from "../components/PostgresTasks";

export default function AllTasks() {
  const [serviceType, setServiceType] = useState<string>("");

  return (
    <Container className="mt-2">
      {serviceType == "" ? (
        <Card className="p-4 mt-2">
          <Row className="mt-2">
            <h2>Choose what service to test</h2>
          </Row>
          <Row className="mt-2">
            <Col className="mt-2">
              <Button
                className="me-5"
                color="primary"
                onClick={() => setServiceType("Mongo")}
              >
                Mongo
              </Button>
              <Button
                color="primary"
                onClick={() => setServiceType("Postgres")}
              >
                Postgres
              </Button>
            </Col>
          </Row>
        </Card>
      ) : (
        <>
          {serviceType === "Mongo" && <MongoTasks />}
          {serviceType === "Postgres" && <PostgresTasks />}
        </>
      )}
    </Container>
  );
}
