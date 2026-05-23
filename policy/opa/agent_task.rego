package post_quantum_studio.agent_task

import future.keywords.if
import future.keywords.in

default allow := false

default deny := []

allowed_risk_levels := {"low", "medium", "high", "critical"}

allow if {
  input.schemaVersion == "1.0"
  input.taskId != ""
  input.correlationId != ""
  input.fromAgent != ""
  input.toAgent != ""
  input.intent != ""
  input.riskLevel in allowed_risk_levels
  not requires_missing_approval
}

requires_missing_approval if {
  input.approvalRequired == true
  not input.approvalId
}

deny contains "approvalId is required when approvalRequired is true" if {
  requires_missing_approval
}

deny contains "riskLevel must be one of low, medium, high, critical" if {
  not input.riskLevel in allowed_risk_levels
}
